# WeatherScope 🔆☁️

WeatherScope is a dynamic and visually appealing weather application that provides real-time weather information with an adaptive user interface that changes based on the current weather conditions.

## ⭐ Features

- **Real-time Weather Data**: Get current weather information for cities around the world.
- **Adaptive UI**: The color scheme of the entire application dynamically adapts to the weather conditions (e.g., warm colors for sunny days, cool tones for rainy weather).
- **Responsive Design**: The application is fully responsive and works seamlessly on desktops, tablets, and mobile devices.
- **AI-Powered**: Leverages Google's AI through Genkit to provide weather data and generate adaptive color themes.

## 🔨 Tech Stack

This project is built with a modern and robust technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 🎯 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Environment Variables

To run the application, you'll need to set up your environment variables. Create a `.env.local` file in the root of the project and add your Google AI API key:

```
GEMINI_API_KEY=your_google_ai_api_key
```

You can obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

---

### 💻 Installation & Running the App

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

⚠️ The application will be available at `http://localhost:9002`.

---

👫 **Contributing:**

We welcome contributions to this project! If you'd like to contribute, please:

1. Fork the repository on GitHub.
2. Make your changes and create a pull request.
3. Follow any coding style guidelines mentioned in the code (if any).

---

💳 **License:**

 * This project is licensed under the Open-source [**MIT License**].
 
---

✒️ **Author:**
* This project was created by **[@iamvisshu](https://github.com/iamvisshu)** - Vishal Vishwakarma 😇
