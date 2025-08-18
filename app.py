from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Carregar variáveis do .env
load_dotenv()

# Caminho para o JSON da chave de serviço
FIREBASE_CRED = os.getenv("FIREBASE_CRED")
if not FIREBASE_CRED or not os.path.exists(FIREBASE_CRED):
    raise RuntimeError("❌ Defina FIREBASE_CRED no .env apontando para o JSON da chave privada")

# Inicializar Firebase
cred = credentials.Certificate(FIREBASE_CRED)
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__, static_folder="static", template_folder="templates")


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

    try:
        db.collection("jogadores").add({
            "nome": nome,
            "pontuacao": pontuacao
        })
        return jsonify({"sucesso": True})
    except Exception as e:
        print("❌ Erro ao salvar jogador:", e)
        return jsonify({"sucesso": False, "erro": "Erro ao salvar"}), 500


@app.route("/ranking")
def get_ranking():
    try:
        jogadores_ref = (
            db.collection("jogadores")
              .order_by("pontuacao", direction=firestore.Query.DESCENDING)
              .limit(10)
        )
        docs = jogadores_ref.stream()

        ranking = [
            {"nome": doc.to_dict().get("nome"),
             "pontuacao": doc.to_dict().get("pontuacao")}
            for doc in docs
        ]

        return jsonify(ranking)
    except Exception as e:
        print("❌ Erro ao buscar ranking:", e)
        return jsonify([]), 500


if __name__ == "__main__":
    app.run(debug=True)
