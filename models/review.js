import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema ({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    profilePicture : {
        type : String,
        required : true,
        default : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAngMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwECB//EADUQAAICAQEFBQQJBQAAAAAAAAABAgMEEQUSITFBEyIyUXEjUmHRFEJigZGhscHhFSUzgvD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3EAAAAAAAAAAADwD0AAAAAAAAAAAAAAAAAAADyUlGLbeiXNsD0rsratNL3a/aS+HL8SBtHaEshuuptVdem9/BAAmXbTyrG9J7i8oo4PJvl4rrH/szkAO0cvIj4b58PtEuja98OFqVi/BlcANLiZ1OV4Jbs+sJcyUZFNxacW01yaLrZm0e2apva7TTuy97+QLQAAAAAAAAAAAAAKbbWW2/o0Hw5z+Rb2TVdcpy5RWrMpZOVk5Tn4pPVgfIAAAAAAAAXB6rg11AA0ezcr6Vjpya348JfMmGd2Rd2WZGPSa3X+xogAAAAAAAAAAAhbXluYFrXN6L8WjOmg20v7fP4Sj+pnwAAAAAAAAAAA9rluWRmvqtM1qMg1qtPPga9ctAPQAAAAAAAAABHzq+1xLYJatxMunqbAzW0cd42TKP1JcYgRQAAAAAAAAAB2w6+1y6oLjrI1CKjYeO96WRJdN2P7lwAAAAAAAAAAAAi5+JHKp3eU1xi/IlADIzhKucozW7KL4pnhpM3Brylq+7NcpIosrEuxn7SHd6SXJgcAAAAAA74WLPKtUUtILxS8kd8PZl1+krPZ1+b5v7i9oprorUK46ID2quNUIwgtIxWiR9gAAAAAAAAAACLm5leJXrPjN+GPmB3sshXBzskoxXVsg/1fG7ZQW9u+/pwKbJybcme9ZL0XRHIg1sJRlFSi00+OqfA9a1WjMxjZd2M/Zy7vWL5MtaNsUyWl0XW/PmgO9uzcW16yqSfnF6HB7Fo6TsX3onVZNNq1rthL0Z01KK6OxsdPWU7JfDXQlUYdFH+OqKfm+LO7klz4epHtzsarx2x18k9QJJxyMivHrc7ZJLp8StydsvjHHr0+1L5FXbbO6bnbJyk+rINBjbSx8h7qk4S92fAmGQLHA2nKnSF7cq+WvNxKL4HzCcZxUoNOL5NdT6AAAAAeAccvIjjUuyfol5szV1s77HZY25P8vgSNqZX0nJai/ZwekdOvmyIAAAAAAD1TkuUpL0Z4APXKT5tv1Z4AAAAAAAWGys10WKqx+yk+D91/IvzIF9sbK7anspvv18PVAWIAAELa2R2GJLR6Tn3UTSh21dv5Ua/q1r82BXAAAAAAAAAAAAAAAAAAAdsO94+RCxck9JenU4gDXJprVcj0h7Ku7XChq+MO6/+9CYAMrlycsu5vnvv9QAOQAAAAAAAAAAAAAAAAAAAAC32A3pdHpwf6/IuAAP/2Q=="
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    }
})

const Review = mongoose.model("Review",reviewSchema);

export default Review;