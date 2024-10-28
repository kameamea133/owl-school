import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";  
import cloudinary from "../config/cloudinary.js";


const createCourse = asyncHandler(async (req, res) => {
    
    const { title, description, headerImage, content, instructor } = req.body;
    
    if (!title || !description) {
        res.status(400);
        throw new Error("Veuillez fournir les champs title et description");
    }
   
   
    const user = await User.findById(req.user._id);
   

    let instructorId;

    if (user.checkIsAdmin()) {
        instructorId = instructor || req.user._id;
    } else if (user.checkIsTeacher()) {
        if (instructor && instructor !== req.user._id.toString()) {
            res.status(403);
            throw new Error("En tant qu'enseignant, vous ne pouvez créer que vos propres cours");
        }
        instructorId = req.user._id;
    } else {
        res.status(403);
        throw new Error("Accès refusé : seuls les admins et les enseignants peuvent créer des cours");
    }


    let headerImageUrl = '';
    if (req.files && req.files.headerImage) {
        const result = await cloudinary.v2.uploader.upload(req.files.headerImage.tempFilePath, {
            folder: "courses",
        });
        headerImageUrl = result.secure_url;
    }
    const course = await Course.create({
        title,
        description,
        instructor: instructorId,
        headerImage: headerImageUrl,
        content: content || []
    });

    res.status(201).json({
        message: "Cours créé avec succès",
        course
    });
  });

  const getCourses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    let courses;

    // Si l'utilisateur est admin, il peut voir tous les cours sans restriction
    if (user.checkIsAdmin()) {
        courses = await Course.find();
    } 
    // Si l'utilisateur est un teacher, il peut voir tous les cours ou filtrer par les cours qu'il a créés
    else if (user.checkIsTeacher()) {
        if (req.query.createdByMe === "true") {
            // Filtrer par cours créés par le teacher actuel
            courses = await Course.find({ instructor: req.user._id });
        } else {
            // Voir tous les cours
            courses = await Course.find();
        }
    } 
    // Si l'utilisateur est un student, il ne voit que les cours auxquels il est inscrit
    else {
        courses = await Course.find({ studentsEnrolled: req.user._id });
    }

    res.status(200).json({ message: "Vous n'êtes inscrit à aucun cours.", courses });
});

  const updateCourse = asyncHandler(async (req, res) => {
    const { title, description, headerImage, content } = req.body;

    
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error("Cours non trouvé");
    }

   
    const user = await User.findById(req.user._id);

   
    if (user.checkIsAdmin() || (user.checkIsTeacher() && course.instructor.equals(req.user._id))) {
        
        course.title = title || course.title;
        course.description = description || course.description;
        course.headerImage = headerImage || course.headerImage;
        course.content = content || course.content;

        const updatedCourse = await course.save();

        res.status(200).json({
            message: "Cours mis à jour avec succès",
            course: updatedCourse
        });
    } else {
        res.status(403);
        throw new Error("Accès refusé : vous n'êtes pas autorisé à modifier ce cours");
    }
});

const deleteCourse = asyncHandler(async (req, res) => {
    // Récupérer le cours par son ID
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error("Cours non trouvé");
    }

    // Vérifier si l'utilisateur est admin ou teacher
    const user = await User.findById(req.user._id);

    // Vérifier les permissions pour la suppression
    if (user.checkIsAdmin() || (user.checkIsTeacher() && course.instructor.equals(req.user._id))) {
        await Course.findByIdAndDelete(course._id); // Utiliser findByIdAndDelete pour supprimer le cours
        res.status(200).json({ message: "Cours supprimé avec succès" });
    } else {
        res.status(403);
        throw new Error("Accès refusé : vous n'êtes pas autorisé à supprimer ce cours");
    }
});

const enrollInCourse = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);

    
    if (!user || user.role !== "student") {
        res.status(403);
        throw new Error("Accès refusé : seuls les étudiants peuvent s'inscrire aux cours");
    }

    
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error("Cours non trouvé");
    }

    
    if (course.studentsEnrolled.includes(req.user._id)) {
        return res.status(400).json({ message: "Vous êtes déjà inscrit à ce cours" });
    }

    course.studentsEnrolled.push(req.user._id);
    await course.save();

    res.status(200).json({ message: "Inscription réussie", course });
});


 
  

  export { createCourse, updateCourse, deleteCourse, getCourses, enrollInCourse };  