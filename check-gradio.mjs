import { Client } from "@gradio/client";

async function checkApi() {
  try {
    const app = await Client.connect("vinthony/SadTalker");
    const endpoints = await app.view_api();
    console.log(JSON.stringify(endpoints, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}
checkApi();
