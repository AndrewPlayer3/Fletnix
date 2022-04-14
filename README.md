# Fletnix - Video Streaming Site with MongoDB + NextJS
This is a basic responsive video streaming website made with NextJS, Tailwind CSS, and MongoDB. 

### Features include:
- watching videos
- ratings 
- basic analytics
- uploading and removing videos
- tags
- auto re-render searching
- manual searching
- User Roles:
  * Viewer Role -- Can only view videos
  * Content Editor Role -- Can upload and remove videos
  * Content Manager Role -- Can view the analytics of videos
- Login and Signup
- and more...

## Main Pages
### Home Page
The home page lazy-loads all of the videos from the DB as you scroll, pulling the thumbnails from a Google Cloud Storage Bucket. User's can use the search bar to search for videos; the list of videos updates as they type. 
![home_page](https://user-images.githubusercontent.com/19739107/162868256-02620d48-c18b-43bc-9947-9f6179bfb7fc.png)

### Home Login Form
If a user clicks the profile icon in the top right, they will have the option to Sign In, this will bring down the login form. Clicking anywhere outside of the login form will make it go away.
![home_login](https://user-images.githubusercontent.com/19739107/162868547-6854fe73-e855-4b9f-a1c6-fabb7830fcf9.png)

### Video Login Form
User's must be logged in to view videos. When an unauthenticated user clicks on a video, they are prompted to login by a form covering the page. Note, the blurred out page just not actually contain the video, just the thumbnail, so removing the form through inspect element will not allow them to view the video. 
![login_video](https://user-images.githubusercontent.com/19739107/162868356-b3ae3996-fd16-4804-a11d-5fef57ea3b2f.png)

### Signup Page
![signup](https://user-images.githubusercontent.com/19739107/162868447-9ba40922-10bd-4007-9881-bed3ea60eef2.png)

### Video Page
User's are able to watch the video, and are able to see the title and description. They also have a 5-star rating option. Each user can rate the video which changes the 5 star rating on the display on the homepage, as well as in the rating portion of the content manager's dashboard. If a user rates a video more than once, only their latest rating will be counted.
![video](https://user-images.githubusercontent.com/19739107/162868278-3c6886c5-056c-45e5-84a0-2578866143b0.png)

### Editor Dashboard Page
User's with the content_editor role are able to upload and delete videos. They have this dashboard where they are able to see a list of all videos, and are able to delete them. They also have a form that can be used to upload new videos. The videos and thumbnails are uploaded to a Google Cloud Storage Bucket.
![editor_dashboard](https://user-images.githubusercontent.com/19739107/162868389-fe6ec068-4c3e-4af5-a342-b1e60b9cb66f.png)

### Manager Dashboard Page
User's with the content_manager role are able to view the analytics for all of the videos. Currently, views and average rating are the available analytics.
![manager_dashboard](https://user-images.githubusercontent.com/19739107/162868409-40bca013-3633-4661-92e2-a3635167233a.png)


## User stories

https://docs.google.com/document/d/1B8ghIj61_sw1IGzUquypRFdxqRF6PYol-0i7VQYMHKM/edit

