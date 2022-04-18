import { Client, Entity, Schema } from 'redis-om'

const client = new Client()

export async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
        if (client.isOpen()) {
            console.log('Redis client has been opened.')
        } else {
            console.log('Redis client has not been opened.')
        }
    }
}

class Video extends Entity {}

let videoSchema = new Schema(
    Video,
    {
        title: { type: 'text' },
        description: { type: 'text' },
        tags: { type: 'string[]' },
        filename: { type: 'string' },
        thumbnail: { type: 'string' },
        length: { type: 'number' },
        created_at: { type: 'date' },
        total_watchtime: { type: 'number' },
        total_rating: { type: 'number' },
        num_ratings: { type: 'number' },
        views: { type: 'number' },
    },
    {
        dataStructure: 'JSON',
    }
)

export async function createVideo(data) {
    try {
        const repository = client.fetchRepository(videoSchema)
        const video = repository.createEntity(data)
        const id = await repository.save(video)
        return id
    } catch (error) {
        console.log(error)
    }
}

export async function getAllVideos() {
    try {
        const videoRepository = client.fetchRepository(videoSchema)
        await videoRepository.createIndex()
        let videos = await videoRepository.search().return.all()
        videos = await videoRepository.search().where('title').m
        return videos
    } catch (error) {
        console.log('Get all videos error: ', error.message)
        return []
    }
}

export async function getVideoById(id) {
    try {
        const videoRepository = client.fetchRepository(videoSchema)
        await videoRepository.createIndex()
        let video = await videoRepository.fetch(id)
        return video
    } catch (error) {
        console.log('GetVideoById Error: ', error.message)
        return []
    }
}

export async function getVideoBySearch(search) {
    try {
        const videoRepository = client.fetchRepository(videoSchema)
        await videoRepository.createIndex()
        let video = await videoRepository
            .search()
            .where('title')
            .matches(search)
            .or('description')
            .matches(search)
            .return.all()
        return video
    } catch (error) {
        console.log('getVideoBySearch Error: ', error.message)
        return []
    }
}

// TypeError: this.writeEntity is not a function
// This package may be broken at the moment.
// This package is in preview and does not support many
// of the features we have been using from mongoose.

// Instead, we will likely have to use @node-redis/client, @node-redis/json, and @node-redis/search.
// Wait, there was a hero in the YouTube comments.
// I just needed to change new Repository(schema, client) to client.fetchRepository(schema).
