import { supabase } from "./supabase.js";

const container = document.getElementById("porchMessages");

async function loadFrontPorch() {

    if (!container) return;

    const { data, error } = await supabase

        .from("front_porch_messages")

        .select("*")

        .eq("approved", true)

        .eq("status", "approved")

        .order("pinned", { ascending: false })

        .order("featured", { ascending: false })

        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        container.innerHTML =
            "<p>Unable to load messages.</p>";

        return;

    }

    if (!data.length) {

        container.innerHTML =
            "<p>No porch messages yet.</p>";

        return;

    }

    container.innerHTML = data.map(message => `

        <article class="porch-message">

            <div class="porch-header">

                <h3>${escape(message.name)}</h3>

                <span>${escape(message.country || "")}</span>

            </div>

            <p class="fan-message">

                ${escape(message.message)}

            </p>

            ${message.dakota_reply ?

                `<div class="dakota-reply">

                    <strong>Dakota replied</strong>

                    <p>${escape(message.dakota_reply)}</p>

                </div>`

            : ""}

        </article>

    `).join("");

}

function escape(text){

    if(!text) return "";

    return text

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}

loadFrontPorch();