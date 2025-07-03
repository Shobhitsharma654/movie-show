import React from 'react'
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBooking from './pages/MyBooking';
import Favorite from './pages/Favorite';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer';
import Movies from './pages/Movies';
import Layout from './pages/admin/Layout.jsx';
import ListBookings from './pages/admin/ListBookings.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import AddShows from './pages/admin/AddShow.jsx';
import ListShows from './pages/admin/ListShows.jsx';

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith("/admin")
  return (
   <>
 <Toaster />
   {!isAdminRoute && <Navbar />}
 
 <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movies" element={<Movies />} />
  <Route path="/movies/:id" element={<MovieDetails />} />
  <Route path="/movies/:id/:date" element={<SeatLayout />} />
  <Route path="/my-bookings" element={<MyBooking />} />
  <Route path="favorite/" element={<Favorite />} />
  <Route path='/admin/*' element={<Layout />} >
<Route index element={<Dashboard />} />
<Route path='add-shows' element={<AddShows />}/>
<Route path='list-shows' element={<ListShows />}/>
<Route path='list-bookings' element={<ListBookings />}/>

  </Route>
 </Routes>
  {!isAdminRoute && <Footer />}
   </>
  )
}

export default App