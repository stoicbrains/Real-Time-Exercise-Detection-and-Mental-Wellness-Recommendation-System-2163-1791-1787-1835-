"use client"
    import React from "react";
    import Script from "next/script";
    const   Botpress = () => {
      const initBotpress=()=>{
        window.botpressWebChat.init({
          composerPlaceholder: "Feel free to ask",
          botConversationDescription: "We care for You",
          botId: "84d2be93-fd5e-419a-b21a-957ec47f0c53",
          hostUrl: "https://cdn.botpress.cloud/webchat/v1",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: "84d2be93-fd5e-419a-b21a-957ec47f0c53",
          webhookId: "f15e494e-e88c-40d2-8af8-db49608f6981",
          lazySocket: true,
          themeName: "prism",
          botName: "Harmony chat bot",
          avatarUrl: "https://media.istockphoto.com/id/1294477039/vector/metaphor-bipolar-disorder-mind-mental-double-face-split-personality-concept-mood-disorder-2.jpg?s=612x612&w=0&k=20&c=JtBxyFapXIA63hzZk_F5WNDF92J8fD2gIFNX3Ta4U3A=",
          phoneNumber: "7014931904",
          emailAddress: "mahakalujjain12345@gmail.com",
          stylesheet: "https://webchat-styler-css.botpress.app/prod/0ad5a3a3-3153-4b2f-a246-7abf225e7e9f/v67678/style.css",
          "frontendVersion": "v1",
          "useSessionStorage": true,
          enableConversationDeletion: true,
          theme: "prism",
          themeColor: "#2563el"
      });
      };
      return (
        <div>
          <Script
          src="https://cdn.botpress.cloud/webchat/v1/inject.js"
          onLoad={() => {
            initBotpress();
          }}/>
        </div>
      )
    }
    
    export default Botpress
    