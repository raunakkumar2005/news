import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavInshort from "./components/Navbars";
import NewsContent from "./components/NewsContent/NewsContent";
const api_Key = "9350f9ef44ec4b58aed9effffa102210";
function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(30);
  const [category, setCategory] = useState("general");

  const newsApi = async () => {
    const news = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api_Key}&pageSize=${loadMore}&category=${category}`
    );
    setNewsArray(news.data.articles);
    setNewsResults(news.data.totalResults);
  };

  console.log(newsArray);

  useEffect(() => {
    newsApi();
  }, [newsResults, category, loadMore]);

  return (
    <div className="App" id="#home">
      <div className="navbar">
        <NavInshort setCategory={setCategory} />
      </div>
      {newsResults && (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
