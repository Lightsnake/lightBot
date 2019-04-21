const Discord = require('discord.js');
const {prefix, token, giphyToken, youtubeAPI} = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.music = require("discord.js-musicbot-addon");


var GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(giphyToken);



client.once('ready', () =>{
	console.log('Ready!')
})


//Music 
client.music.start( client, {
	youtubeKey: youtubeAPI,
	//Play Command
	play:{
		usage: `{prefix}youtube`,
		excluse: false
	},
	anyoneCanSkip: true,
	ownerOverMember: true,
	ownerID:"169644479123423232"
})



//Commands
client.on('message', message =>{
	/* Used to Kick out people while sending them a fail gif */ 
	if ( message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){
		//console.log(message.content);
		if ( message.content.startsWith(`${prefix}kick`)){
			//message.channel.send("Kick");
			let member = message.mentions.members.first();
			member.kick().then((member)=>{
				giphy.search('gifs', {"q": "fail"})
					.then((response)=>{
						var totalResponses = response.data.length;
						var responseIndex = Math.floor((Math.random() * 10) + 1 ) % totalResponses;
						var responseFinal = response.data[responseIndex];
						
						message.channel.send(":wave: " + member.displayName +" has been kicked!", 
						{files: [responseFinal.images.fixed_height.url]}
						);
					}).catch(()=>{
						message.channel.send("Error!");
					})
			})
		}
	}
	// Sends Cat Gifs
	if ( message.content.startsWith(`${prefix}cat`)){
		giphy.search('gifs', {"q": "cat"})
			.then((response)=>{
				var totalResponses = response.data.length;
				var responseIndex = Math.floor((Math.random() * 10) + 1 ) % totalResponses;
				var responseFinal = response.data[responseIndex];
				message.channel.send({files: [responseFinal.images.fixed_height.url]});
			}).catch(()=>{
				message.channel.send("Error!");
			})
	}
 
	// Leaves the Channel
	if(message.content.startsWith(`${prefix}leave`)){
		message.guild.me.voiceChannel.leave();
	}
})

client.login(token);

