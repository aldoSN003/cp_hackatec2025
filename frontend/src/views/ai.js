import axios from "axios";

export async function getAiPreDiagnosis(patientId, enfermedadesCronicas, sintomas, motivoDeConsulta) {
    try {
        console.log("🚀 Iniciando petición AI pre-diagnosis");
        console.log("📊 Datos a enviar:", {
            patientId,
            enfermedadesCronicas,
            sintomas,
            motivoDeConsulta
        });

        // Verificar que los datos no estén vacíos
        if (!patientId || !sintomas || !motivoDeConsulta) {
            throw new Error("Faltan datos requeridos");
        }

        console.log("🌐 Enviando petición a:", "http://localhost:5000/assistant/pre-diagnosis");

        const response = await axios.post(
            "http://localhost:5000/assistant/pre-diagnosis",
            {
                patientId: patientId,
                enfermedadesCronicas: enfermedadesCronicas,
                sintomas: sintomas,
                motivoDeConsulta: motivoDeConsulta
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                timeout: 30000,
                // Agregar configuración adicional para debugging
                validateStatus: function (status) {
                    console.log("📡 Status recibido:", status);
                    return status >= 200 && status < 300;
                }
            }
        );

        console.log("✅ Respuesta exitosa:", response.status);
        console.log("📦 Headers de respuesta:", response.headers);
        console.log("📄 Data recibida:", response.data);

        // Validar estructura de respuesta
        if (!response.data || !response.data.preDiagnostico) {
            console.error("❌ Estructura de respuesta inválida:", response.data);
            throw new Error("Respuesta del servidor con formato inválido");
        }

        return response.data.preDiagnostico;

    } catch (error) {
        console.error("💥 Error completo:", error);

        // Información detallada del error
        if (error.response) {
            console.error("🔴 Error de respuesta del servidor:");
            console.error("- Status:", error.response.status);
            console.error("- Headers:", error.response.headers);
            console.error("- Data:", error.response.data);
        } else if (error.request) {
            console.error("🔴 Error de petición (no hubo respuesta):");
            console.error("- Request:", error.request);
            console.error("- ReadyState:", error.request.readyState);
            console.error("- Status:", error.request.status);
        } else {
            console.error("🔴 Error de configuración:", error.message);
        }

        // Verificar si es un error de red específico
        if (error.code === 'ERR_NETWORK') {
            console.error("🌐 Error de red detectado - posibles causas:");
            console.error("1. Servidor Flask no está corriendo");
            console.error("2. Puerto incorrecto");
            console.error("3. Problema de CORS (aunque dijiste que no es)");
            console.error("4. Firewall bloqueando la conexión");
        }

        // Return structure con información del error para debugging
        return {
            patientId: patientId,
            assignedDoctor: null,
            assignedEquipment: [],
            assignedRoom: null,
            notes: `Error: ${error.message}`,
            possibleConditions: [],
            recommendedTests: [],
            urgencyLevel: "error",
            error: true,
            errorDetails: {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                statusText: error.response?.statusText
            }
        };
    }
}

// Función adicional para probar la conexión
export async function testConnection() {
    try {
        console.log("🔍 Probando conexión básica...");
        const response = await axios.get("http://localhost:5000/", {
            timeout: 5000
        });
        console.log("✅ Conexión básica exitosa:", response.status);
        return true;
    } catch (error) {
        console.error("❌ Fallo en conexión básica:", error.message);
        return false;
    }
}