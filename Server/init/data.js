const courses = [
  // Animation
  {
    courseId: "A001",
    title: "3D Animation Basics",
    rating: 4.7,
    price: 49.99,
    teacherName: "John Doe",
    thumbnail: "https://example.com/animation1.jpg",
    category: "Animation"
  },
  {
    courseId: "A002",
    title: "Character Animation for Beginners",
    rating: 4.8,
    price: 59.99,
    teacherName: "Jane Smith",
    thumbnail: "https://example.com/animation2.jpg",
    category: "Animation"
  },
  {
    courseId: "A003",
    title: "Animating with Blender",
    rating: 4.6,
    price: 39.99,
    teacherName: "Alice Johnson",
    thumbnail: "https://example.com/animation3.jpg",
    category: "Animation"
  },
  {
    courseId: "A004",
    title: "Motion Graphics with After Effects",
    rating: 4.9,
    price: 69.99,
    teacherName: "Bob Brown",
    thumbnail: "https://example.com/animation4.jpg",
    category: "Animation"
  },
  {
    courseId: "A005",
    title: "Advanced 3D Animation Techniques",
    rating: 4.5,
    price: 79.99,
    teacherName: "Charlie Green",
    thumbnail: "https://example.com/animation5.jpg",
    category: "Animation"
  },
  // Creative Writing
  {
    courseId: "CW001",
    title: "Creative Writing 101",
    rating: 4.7,
    price: 29.99,
    teacherName: "Emily White",
    thumbnail: "https://example.com/creativewriting1.jpg",
    category: "Creative Writing"
  },
  {
    courseId: "CW002",
    title: "Writing Fiction: Introduction",
    rating: 4.8,
    price: 34.99,
    teacherName: "Daniel Black",
    thumbnail: "https://example.com/creativewriting2.jpg",
    category: "Creative Writing"
  },
  {
    courseId: "CW003",
    title: "Poetry Writing Workshop",
    rating: 4.6,
    price: 24.99,
    teacherName: "Sophia Brown",
    thumbnail: "https://example.com/creativewriting3.jpg",
    category: "Creative Writing"
  },
  {
    courseId: "CW004",
    title: "Screenwriting Fundamentals",
    rating: 4.9,
    price: 49.99,
    teacherName: "Michael Green",
    thumbnail: "https://example.com/creativewriting4.jpg",
    category: "Creative Writing"
  },
  {
    courseId: "CW005",
    title: "Creative Nonfiction Writing",
    rating: 4.5,
    price: 39.99,
    teacherName: "Laura Blue",
    thumbnail: "https://example.com/creativewriting5.jpg",
    category: "Creative Writing"
  },
  // Film & Video
  {
    courseId: "FV001",
    title: "Introduction to Filmmaking",
    rating: 4.7,
    price: 59.99,
    teacherName: "Chris Red",
    thumbnail: "https://example.com/filmandvideo1.jpg",
    category: "Film & Video"
  },
  {
    courseId: "FV002",
    title: "Video Editing with Premiere Pro",
    rating: 4.8,
    price: 49.99,
    teacherName: "Kim Yellow",
    thumbnail: "https://example.com/filmandvideo2.jpg",
    category: "Film & Video"
  },
  {
    courseId: "FV003",
    title: "Cinematography Basics",
    rating: 4.6,
    price: 69.99,
    teacherName: "Alex Purple",
    thumbnail: "https://example.com/filmandvideo3.jpg",
    category: "Film & Video"
  },
  {
    courseId: "FV004",
    title: "Directing Actors",
    rating: 4.9,
    price: 79.99,
    teacherName: "Pat Orange",
    thumbnail: "https://example.com/filmandvideo4.jpg",
    category: "Film & Video"
  },
  {
    courseId: "FV005",
    title: "Sound Design for Film",
    rating: 4.5,
    price: 39.99,
    teacherName: "Morgan Pink",
    thumbnail: "https://example.com/filmandvideo5.jpg",
    category: "Film & Video"
  },
  // Fine Art
  {
    courseId: "FA001",
    title: "Watercolor Painting for Beginners",
    rating: 4.7,
    price: 19.99,
    teacherName: "Olivia Grey",
    thumbnail: "https://example.com/fineart1.jpg",
    category: "Fine Art"
  },
  {
    courseId: "FA002",
    title: "Drawing and Sketching",
    rating: 4.8,
    price: 24.99,
    teacherName: "Liam Brown",
    thumbnail: "https://example.com/fineart2.jpg",
    category: "Fine Art"
  },
  {
    courseId: "FA003",
    title: "Oil Painting Techniques",
    rating: 4.6,
    price: 29.99,
    teacherName: "Emma Green",
    thumbnail: "https://example.com/fineart3.jpg",
    category: "Fine Art"
  },
  {
    courseId: "FA004",
    title: "Sculpture for Beginners",
    rating: 4.9,
    price: 34.99,
    teacherName: "James White",
    thumbnail: "https://example.com/fineart4.jpg",
    category: "Fine Art"
  },
  {
    courseId: "FA005",
    title: "Digital Art and Illustration",
    rating: 4.5,
    price: 39.99,
    teacherName: "Ava Black",
    thumbnail: "https://example.com/fineart5.jpg",
    category: "Fine Art"
  },
  // Graphic Design
  {
    courseId: "GD001",
    title: "Graphic Design Fundamentals",
    rating: 4.7,
    price: 29.99,
    teacherName: "Isabella Blue",
    thumbnail: "https://example.com/graphicdesign1.jpg",
    category: "Graphic Design"
  },
  {
    courseId: "GD002",
    title: "Logo Design Masterclass",
    rating: 4.8,
    price: 39.99,
    teacherName: "Lucas Red",
    thumbnail: "https://example.com/graphicdesign2.jpg",
    category: "Graphic Design"
  },
  {
    courseId: "GD003",
    title: "Adobe Illustrator for Beginners",
    rating: 4.6,
    price: 49.99,
    teacherName: "Mia Yellow",
    thumbnail: "https://example.com/graphicdesign3.jpg",
    category: "Graphic Design"
  },
  {
    courseId: "GD004",
    title: "Typography and Layout Design",
    rating: 4.9,
    price: 34.99,
    teacherName: "Ethan Purple",
    thumbnail: "https://example.com/graphicdesign4.jpg",
    category: "Graphic Design"
  },
  {
    courseId: "GD005",
    title: "Advanced Photoshop Techniques",
    rating: 4.5,
    price: 59.99,
    teacherName: "Amelia Orange",
    thumbnail: "https://example.com/graphicdesign5.jpg",
    category: "Graphic Design"
  }
];

module.exports = { data: courses };