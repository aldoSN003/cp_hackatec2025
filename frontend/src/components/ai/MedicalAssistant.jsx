import Vapi from "@vapi-ai/web";
const MedicalAssistant =  () => {
    const vapi = new Vapi("c176f802-bf20-4bf3-a64c-6a4b413dd944");
    const assistantId = "260565fb-9852-4f2c-bb7b-361fef96cc4f";
async function makeCall(){
   try {
       const call = await vapi.start(assistantId);
       console.log(call);

   }catch (error) {
       console.log(error);
   }
}

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
            <button type="submit"  onClick={makeCall} className="hover:bg-amber-400">Call</button>
        </div>
    );
};

export default MedicalAssistant;