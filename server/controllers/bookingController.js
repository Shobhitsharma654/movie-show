// Function to check availability of selcted seats for a whole

import Booking from "../models/Booking";
import Show from "../models/Show"


const checkSeatsAvailability = async(showId , selectedSeats) =>{
    try {
        const showData = await Show.findById(showId)
        if(!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);
        return !isAnySeatTaken;
    } catch (error) {
        console.error(error)
        return false;
    }
}

export const creatBooking = async()=>{
    try {
        const {userId} = req.auth();
        const {showId , selectedSeats} = req.body;
        const {origin} = req.headers;


        const isAvailable = await checkSeatsAvailability(showId , selectedSeats)

        if(!isAvailable){
 return res.json({success: false , message:"selected seats are not avaliable"})
        }

        const showData = await Show.findById(showId).populate("movie")

        const booking = await Booking.create({
            user:  userId,
            show:showId,
            amount:showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats

        })

        selectedSeats.map((seat)=>{
            showData.occupiedSeats[seat] = userId;
        })
        showData.markModified("occupiedSeats")

        await showData.save()

        res.json({success:true, message:"Booked successfully"})
    } catch (error) {
            console.error(error.message);
            res.json({success:false , message:error.message})
        
    }
}

export const getOccupiedSeats = async(req,res)=>{
    try {
        const {showId} = req.params;
        const showData = await Show.findById(showId)

        const occupiedSeats = Object.keys(showData.occupiedSeats)

        res.json({success:true , occupiedSeats})
    } catch (error) {
         console.error(error.message);
            res.json({success:false , message:error.message})
    }
}



