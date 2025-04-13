const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogs = require('../mocks/blogs')
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogger,
  mostLikes
} = require('../utils/list_helper')

test('dummy returns one', () => {
  const result = dummy([])
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
  test('should return 0 when array is empty', () => {
    const result = totalLikes([])
    assert.strictEqual(result, 0)
  })
  test('should return the value of the item when there is only one', () => {
    const result = totalLikes([blogs[0]])
    assert.strictEqual(result, 7)
  })
  test('should return the sum of all items in the list', () => {
    const result = totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favoriteBlog', () => {
  test('should return null when list is empty', () => {
    const result = favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })
  test('should return the blog with most likes', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }

    const result = favoriteBlog(blogs)
    assert.partialDeepStrictEqual(result, expected)
  })
})

describe('mostBlogger', () => {
  test('should return null when list is empty', () => {
    const result = mostBlogger([])
    assert.deepStrictEqual(result, null)
  })
  test('should return the author with the greatest amount of blogs', () => {
    const result = mostBlogger(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('mostLikes', () => {
  test('should return null when list is empty', () => {
    const result = mostLikes([])
    assert.deepStrictEqual(result, null)
  })
  test('should return the author with the most likes', () => {
    const result = mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})