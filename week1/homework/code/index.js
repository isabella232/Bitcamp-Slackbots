var SlackBot = require("slackbots")
var request = require("request")
var endpoint = "https://icanhazdadjoke.com/slack"

const envKey = BOT_TOKEN

var bot = new SlackBot({
    token: envKey,
    name: "Jokes Bot"
})

bot.on("message", msg => {
    switch(msg.type) {
        case "message":
            if (msg.channel[0] === "D" && msg.bot_id === undefined) {
                getRandomJoke(postMessage, msg.user)
            }
        break
    }
})

const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true})
}

const getRandomJoke = (callback, user) => {
    return request(endpoint, (error, response) => {
        if(error) {
            console.log(error)
        } else {
            let jokeJSON = JSON.parse(response.body)
            let joke = jokeJSON.attachments[0].text
            return callback(joke, user)
        }
    })
}
