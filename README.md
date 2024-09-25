# Rubber Duck Trainer

Rubber Duck Trainer is an AI-powered Discord bot that detects and responds to unnecessary or poorly explained questions, encouraging users to improve their question-asking skills.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Features

- Keyword detection in Discord messages (currently in Turkish, English support coming soon)
- Integration with OpenAI's GPT-4o mini model for intelligent responses
- Automatic warning messages for unnecessary or poorly explained questions
- Customizable cooldown for command usage

## Project Structure

The project is divided into two main components:

1. `discord-bot/`: Contains the Discord bot application
	 - Detects specific keywords in messages
	 - Communicates with the AI application
2. `ai-application/`: Contains the AI application
	 - Processes messages using OpenAI's GPT-4o mini model
	 - Generates appropriate responses

## Prerequisites

- Node.js
- Discord Bot Token
- OpenAI API Key
- Discord Bot Client ID (obtained from the Discord Developer Portal)
- Discord Server (Guild) ID

## Installation

1. Clone the repository:
	 ```
	 git clone https://github.com/aksuharun/rubber-duck-trainer.git
	 cd rubber-duck-trainer
	 ```

2. Install dependencies for both the Discord bot and AI application:
	 ```
	 cd discord-bot
	 npm install
	 cd ../ai-application
	 npm install
	 ```

3. Set up environment variables:
	 - Copy or rename the `.env.example` file to `.env` in both `discord-bot/` and `ai-application/` directories
	 - Fill in the required values in each `.env` file

4. Configure the Discord bot:
	 - Open `discord-bot/config.js`
	 - Replace the placeholder values with your actual Discord bot client ID and guild ID:
		```javascript
		const config = {
			 clientID: "Your Discord bot client ID here",
			 guildID: "Your Discord server (guild) ID here"
		}
		```

5. Ensure all required values are filled:
	 - In the `.env` files: Discord Bot Token, OpenAI API Key
	 - In `config.js`: Client ID, Guild ID

Failure to provide these values will result in the application not functioning correctly.

## Usage

1. Start the AI application:
	 ```
	 cd ai-application
	 npm start
	 ```

2. In a separate terminal, start the Discord bot:
	 ```
	 cd discord-bot
	 npm start
	 ```

3. Invite the bot to your Discord server using the OAuth2 URL generated in the Discord Developer Portal.

4. The bot will now respond to messages containing the Turkish keyword "var mı" (case-insensitive) and provide warnings for unnecessary or poorly explained questions. English support will be added in a future update.

## Commands

- `/ping`: A simple command to check if the bot is responsive.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [Discord.js](https://discord.js.org)
- [OpenAI Platform](https://platform.openai.com/docs/overview)

## License

MIT License

Copyright (c) 2024 Harun Aksu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.