import { Command } from 'discord-bot/types/command'

export const clear: Command = {
  name: 'clear',
  description: 'Delete up to 99 messages.',
  usage: '[number]',
  execute(message) {
    const user = message.mentions.users.first()
    const amount = parseInt(message.content.split(' ')[1])
      ? parseInt(message.content.split(' ')[1])
      : parseInt(message.content.split(' ')[2])
    if (!amount) {
      return message.reply('Must specify an amount to delete!')
    }

    if (!amount && !user) {
      return message.reply('you must specify a user and amount, or just an amount, of messages to purge!')
    }

    if (amount < 1 || amount >= 100) {
      return message.reply('you need to input a number between 1 and 99.')
    }
    
    message.channel.messages
      .fetch({
        limit: 100,
      })
      .then((messages) => {
        if (message.channel.type == "dm"){
          return message.reply('I cannot bulk delete private messages.')
        }
        if (user) {
          const filterBy = user ? user.id
          messages = messages
            .filter((m) => m.author.id === filterBy)
            .array()
            .slice(0, amount + 1)
          message.channel.bulkDelete(messages).catch((error: string) => console.log(error))
        } else message.channel.bulkDelete(amount + 1).catch((error: string) => console.log(error)) // TODO weird else
      })
  },
}
