# app.py
import math
from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)

# Simulación de usuarios (debe reemplazarse con una autenticación real)
usuarios = {
    'Alexandro': 'Alexandro',
    'Ariana': 'Ariana',
}

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in usuarios and usuarios[username] == password:
            # Autenticación exitosa, redirigir al simulador
            return redirect(url_for('simulador'))
        else:
            error_message = "Usuario o contraseña incorrectos. Inténtalo de nuevo."
            return render_template('login.html', error=error_message)
    return render_template('login.html')

@app.route('/simulador', methods=['GET', 'POST'])
def simulador():
    if request.method == 'POST':
        velocidad_inicial = float(request.form['velocidad_inicial'])
        frecuencia = float(request.form['frecuencia'])
        amplitud = float(request.form['amplitud'])
        longitud_onda = calcular_longitud_onda(velocidad_inicial, frecuencia)
        return render_template('index.html', longitud_onda=longitud_onda, amplitud=amplitud)
    return render_template('index.html', longitud_onda=None, amplitud=None)

def calcular_longitud_onda(velocidad, frecuencia):
    # Cálculo de la longitud de onda utilizando la ecuación v = λf
    longitud_onda = velocidad / frecuencia
    return longitud_onda

if __name__ == '__main__':
    app.run(debug=True)
