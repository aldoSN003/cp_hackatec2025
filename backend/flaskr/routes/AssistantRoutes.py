
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
from flaskr.utils.config import Config
from openai import OpenAI
from datetime import datetime
import json
assistant_bp = Blueprint('assistant_bp', __name__)

client = OpenAI(
    api_key="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"
)


@assistant_bp.route('/pre-diagnosis', methods=['POST'])
@cross_origin(origins=Config.ROUTE, supports_credentials=True)
def prediagnosis():
    try:
        data = request.get_json()

        patient_id = data.get("patientId")
        enfermedades_cronicas = data.get("enfermedadesCronicas", [])
        sintomas = data.get("sintomas", [])
        motivo = data.get("motivoDeConsulta")

        if not all([patient_id, motivo]) or not isinstance(enfermedades_cronicas, list) or not isinstance(sintomas,
                                                                                                          list):
            return jsonify({"error": "Faltan datos requeridos o el formato es incorrecto."}), 400

        # Construir el prompt con instrucciones más específicas
        prompt = f"""
Eres un asistente médico inteligente. Se te proporciona la siguiente información sobre un paciente:

- ID del paciente: {patient_id}
- Enfermedades crónicas: {', '.join(enfermedades_cronicas)}
- Síntomas actuales: {', '.join(sintomas)}
- Motivo de consulta: {motivo}

IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido, sin bloques de código, sin explicaciones, sin texto adicional. La respuesta debe empezar directamente con {{ y terminar con }}.

Genera un pre diagnóstico que siga exactamente esta estructura:

{{
  "patientId": "string",
  "possibleConditions": ["string"],
  "recommendedTests": ["string"],
  "assignedRoom": "string",
  "assignedDoctor": "string",
  "assignedEquipment": ["string"],
  "urgencyLevel": "sin emergencia" | "urgencia menor" | "urgencia" | "reanimacion",
  "notes": "string"
}}
        """

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )

        response_text = completion.choices[0].message.content.strip()

        # Limpiar la respuesta eliminando bloques de código markdown
        def clean_json_response(text):
            # Remover bloques de código markdown
            if text.startswith('```json'):
                text = text[7:]  # Remover ```json
            if text.startswith('```'):
                text = text[3:]  # Remover ```
            if text.endswith('```'):
                text = text[:-3]  # Remover ``` del final

            # Buscar el primer { y el último }
            start = text.find('{')
            end = text.rfind('}')

            if start != -1 and end != -1:
                return text[start:end + 1]

            return text.strip()

        cleaned_response = clean_json_response(response_text)

        try:
            prediagnostico = json.loads(cleaned_response)
        except json.JSONDecodeError as e:
            return jsonify({
                "error": "La respuesta del modelo no es un JSON válido.",
                "raw_response": response_text,
                "cleaned_response": cleaned_response,
                "json_error": str(e)
            }), 500

        return jsonify({"preDiagnostico": prediagnostico}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500