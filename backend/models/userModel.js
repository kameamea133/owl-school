import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],  
        default: 'student',  
    },
    profileImage: { 
        type: String,
    },
},
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.checkIsAdmin = function () {
    return this.isAdmin || this.role === 'admin';
};


userSchema.methods.checkIsTeacher = function () {
    return this.role === 'teacher';
};


const User = mongoose.model("User", userSchema);

export default User;