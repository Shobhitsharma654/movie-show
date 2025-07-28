// Api function to get user booking

import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

export const getUserBookings = async(req, res)=>{
    try {
        const user = req.auth().userId;

        const bookings  = await Booking.find({user}).populate({
            path:"show",
            populate:{path:"movie"}
        }).sort({createdAt: -1})

        res.json({success: true ,bookings})
    } catch (error) {
             console.error(error)
        res.json({success:false , message:"getting user booking failed"})
    }
}

// Add controller function to add favorite movie in clerk user metadaa

export const updateFavorite = async(req,res)=>{
    try {
        const {movieId} = req.body;
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId)

        if(!user.privateMetadata.favorites){
            user.privateMetadata.favorites = []
        }

        if(!user.privateMetadata.favorites.includes(movieId)){
            user.privateMetadata.favorites.push(movieId)
        }else{
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId)
        }
        await clerkClient.users.updateUserMetadata(userId, {privateMetadata:user.privateMetadata})

        res.json({success:true , message:"favorite movies updated"})
    } catch (error) {
         console.error(error)
        res.json({success:false , message:"updatedfavorite error"})
    }
}

export const getFavorites = async(req,res)=>{
    try {
        const user = await clerkClient.users.getUser(req.auth().userId)
        const favorites = user.privateMetadata.favorites;


        // getting movies from databases
        const movies = await Movie.find({_id: { $in: favorites}})
        res.json({success:true , movies})
    } catch (error) {
                console.error(error)
        res.json({success:false , message:"not getting favorite"})
    
    }
}