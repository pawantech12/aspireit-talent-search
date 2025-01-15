import axios from 'axios';

const BASE_URL = 'https://api.elevenlabs.io/v1/convai/conversations';

export const fetchTranscript = async (conversationId) => {
    try {

        const response = await fetch(`${BASE_URL}/${conversationId}`, {
            method: "GET",
            headers: {
              "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        // console.log(data);
        return data;
        
    } catch (error) {
        console.error('Error fetching transcript:', error);
        throw error;
    }
};
