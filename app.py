from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Configuração do banco de dados
def get_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Rota principal (renderiza o quiz)
@app.route("/")
def home():
    return render_template("index.html")

# Rota para salvar nome e pontuação
@app.route("/salvar_jogador", methods=["POST"])
def salvar_jogador():
    dados = request.json
    nome = dados["nome"]
    pontuacao = dados["pontuacao"]

    conn = get_db()
    conn.execute("INSERT INTO jogadores (nome, pontuacao) VALUES (?, ?)", (nome, pontuacao))
    conn.commit()
    conn.close()

    return jsonify({"sucesso": True})

# Rota para pegar ranking
@app.route("/ranking")
def get_ranking():
    conn = get_db()
    ranking = conn.execute("SELECT nome, pontuacao FROM jogadores ORDER BY pontuacao DESC LIMIT 10").fetchall()
    conn.close()
    return jsonify([dict(row) for row in ranking])

# Cria o banco de dados se não existir
def init_db():
    conn = sqlite3.connect('database.db')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS jogadores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            pontuacao INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    app.run(debug=True)  # Roda em http://localhost:5000