const logger = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  let favBlog = { likes: 0 }
  blogs.forEach((blog) => {
    if (blog.likes > favBlog.likes) {
      favBlog = blog
    }
  })

  return favBlog
}

const mostBlogger = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const mostBlogger = {
    author: '',
    blogs: 0
  }

  // Generate a Dicctionary { 'Author': num_blogs }
  const map = {}
  blogs.forEach(blog => {
    const currValue = map[blog.author] ? map[blog.author] : 0
    map[blog.author] = currValue + 1
  })

  // Iterate the Dicctionary for getting the top author.
  const keys = Object.keys(map)
  keys.forEach((author) => {
    if (map[author] > mostBlogger.blogs) {
      mostBlogger.author = author
      mostBlogger.blogs = map[author]
    }
  })

  return mostBlogger
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const mostLiked = {
    author: '',
    likes: 0
  }

  // Generate a Dicctionary { 'Author': num_likes }
  const map = {}
  blogs.forEach(blog => {
    const currValue = map[blog.author] ? map[blog.author] : 0
    map[blog.author] = currValue + blog.likes
  })

  // Iterate the Dicctionary for getting the top author with more likes.
  const keys = Object.keys(map)
  keys.forEach((author) => {
    if (map[author] > mostLiked.likes) {
      mostLiked.author = author
      mostLiked.likes = map[author]
    }
  })

  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogger,
  mostLikes
}