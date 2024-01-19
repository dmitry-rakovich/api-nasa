import { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import { ImageData } from "./interface";
import { URL } from "./constants";

const App = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${URL}&${new URLSearchParams({ start_date: startDate, end_date: endDate })}`);
      setImages([...response.data]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    fetchImages();
  }, [endDate, startDate]);

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h2" align="center" gutterBottom>
          Astronomy Picture of the Day
        </Typography>
        <form className="input-block">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              min={'1995-06-16'}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              max={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
        </form>

        {
          isLoading
            ? <Typography variant="h3" component="h1">Loading...</Typography>
            : images.length > 0 && <div>
              {images.map(image => (
                <Card key={image.url} style={{ marginTop: '1.5rem', padding: '0.5rem' }}>
                  <CardMedia component="img" alt={image.title} width={500} image={image.url} />
                  <CardContent>
                    <Typography variant="h4" component="div">
                      {image.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {new Date(image.date).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
        }
      </Container>
    </>
  );
};

export default App;