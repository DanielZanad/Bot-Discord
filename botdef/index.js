const {Client, Attachemt} = require ('discord.js');
const client = new Client()
const config = require("./config.json");

const respostas = [""];

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuarios, em 
    ${client.channels.cache.size} canais , em ${client.guilds.cache.size} servidores.`);
    // Adiciona uma mensagem ao status do bot
    client.user.setActivity(``);
});

client.on("message", async message =>{
    //para o bot nao responder outros bots, e para nao responder dms
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //separar atraves de argumentos o nome do comando e os parametros do comando
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    

    if(comando == ""){
        // Number e o numero da quantidade de imagens em 'images'
        // Cada imagens deve ser renomeada para 1.png, 2.png.. etc
        // Esse comando permite enviar gifs 
        number = ???;
        imagesNumber = Math.floor (Math.random() * (number - 1 +1)) +1;
        message.channel.send ({files: ["./images/" + imagesNumber + ".png"]})
        console.log(comando)
        
    }
    if(comando == "ajuda" || comando == "help"){
        message.channel.send(`(Aqui comandos que o bot eira fazer)`)

    }


    if(comando == "d20"){
      number = 20;
      dado = Math.floor (Math.random() * (number - 1 +1)) +1;
      if (dado >= 10){
        message.channel.send (`😎 ${dado} 😎`)
      }else{
        message.channel.send(`😔 ${dado} 😔`)
      }
      
    }

    // Manda uma mensagem aletaoria, com base no array respostas
    if(comando == "Mensagem Aleatoria"){
        number = 9;
        resultado = Math.floor(Math.random() * respostas.length) 
        message.channel.send(respostas[resultado])
    }
    if (comando === "ping"){
        //nesse comando ping foi definido a resposta com a constante m
        const m = await message.channel.send("Ping?");
        m.edit(`A Latência é ${Math.floor(m.createdAt - message.createdAt)}ms. A Latencia da API é ${Math.round(client.ws.ping)}ms`);
    }
    if(comando == "oi"){
        const oi = await message.channel.send("Oi! 🙃 É Fulano né, teu nome? 🤪🤪 Desculpa chegar assim do nada," 
        + "eu sei que deve estar achando estranho 😱😱. Mas é que tu tava aí tão quietinho 😇, "
        + "tá sempre quietinho. Tu não é muito amigo do pessoal aqui? 🧐 Porque eu também não falo muito com ninguém, "
        + "😶😶 então a gente podia, quem sabe 💅🏼... fazer uma coisa junto tipo 👫, sei lá, trabalho em grupo 👨‍👨‍👧‍👧, "
        + "pode contar comigo se tu quiser. 👊👊👊");
    }
    
});



client.on('message', (message) => {
  const messageWords = message.content.split(' ');
  const rollFlavor = messageWords.slice(2).join(' ');
  if (messageWords[0] === '$dice') {
    if (messageWords.length === 1) {
      // $roll
      return message.reply(
        (Math.floor(Math.random() * 6) + 1) + ' ' + rollFlavor
      );
    }

    let sides = messageWords[1]; // $roll 20
    let rolls = 1;
    if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
      // $roll 4d20
      rolls = messageWords[1].split('d')[0] / 1;
      sides = messageWords[1].split('d')[1];
    } else if (messageWords[1][0] == 'd') {
      // $roll d20
      sides = sides.slice(1);
    }
    sides = sides / 1; // Converte para numero
    if (isNaN(sides) || isNaN(rolls)) {
      return;
    }
    if (rolls > 1) {
      const rollResults = [];
      for (let i = 0; i < rolls; i++) {
        rollResults.push(Math.floor(Math.random()*sides)+1);
      }
      const sum = rollResults.reduce((a,b) => a + b);
      return message.reply(`[${rollResults.toString()}] ${rollFlavor}`);
    } else {
      return message.reply(
        (Math.floor(Math.random() * sides) + 1) + ' ' + rollFlavor
      );
    }
  }
});





client.login(config.token);
