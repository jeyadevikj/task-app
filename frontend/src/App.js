import { ThemeProvider } from '@mui/system';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import theme from "./theme";
import { SnackbarProvider } from "notistack"
import Home from './components/Home';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SnackbarProvider maxSnack={1} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: 'center' }}>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </div>
    </ThemeProvider>

  );
}

export default App;
