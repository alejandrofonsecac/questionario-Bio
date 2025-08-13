from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import psycopg
import os

# Carregar variáveis do .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL não definido no .env")

app = Flask(__name__, static_folder="static", template_folder="templates")

# Função simples para abrir conexão
def get_conn():
    try:
        return psycopg.connect(DATABASE_URL)
    except Exception as e:
        print("❌ Erro ao conectar ao banco:", e)
        return None

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/salvar_jogador", methods=["POST"])
def salvar_jogador():
    dados = request.get_json(force=True)
    nome = str(dados.get("nome", "")).strip()
    pontuacao = int(dados.get("pontuacao", 0))

    if not nome:
        return jsonify({"sucesso": False, "erro": "Nome obrigatório"}), 400

    conn = get_conn()
    if not conn:
        return jsonify({"sucesso": False, "erro": "Falha ao conectar ao banco"}), 500

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO jogadores (nome, pontuacao) VALUES (%s, %s)",
                    (nome, pontuacao)
                )
        return jsonify({"sucesso": True})
    except Exception as e:
        print("❌ Erro ao salvar jogador:", e)
        return jsonify({"sucesso": False, "erro": "Erro ao salvar"}), 500
    finally:
        conn.close()

@app.route("/ranking")
def get_ranking():
    conn = get_conn()
    if not conn:
        return jsonify([]), 500

    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT nome, pontuacao
                    FROM jogadores
                    ORDER BY pontuacao DESC, criado_em ASC
                    LIMIT 10
                """)
                rows = cur.fetchall()
        ranking = [{"nome": r[0], "pontuacao": r[1]} for r in rows]
        return jsonify(ranking)
    except Exception as e:
        print("❌ Erro ao buscar ranking:", e)
        return jsonify([]), 500
    finally:
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
