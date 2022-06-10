📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Week 1 Assignment: Flixster

Submitted by: **Duy Nguyen**

Estimated time spent: **8** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](https://doowee0509.github.io/flixster_starter/)

### Application Features

#### CORE FEATURES

- [x] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [x] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [x] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [x] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [x] Website accounts for basic HTML/CSS accessibility features
- [x] Website should be responsive

#### STRETCH FEATURES

- [x] Deploy website using GitHub Pages. 
- [x] Allow user to view more details about a movie within a popup.
- [x] Improve the user experience through CSS & animation.
- [x] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [x] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video

![Animated Walkthrough](https://user-images.githubusercontent.com/96898896/173132601-068dc901-7084-4990-8254-42d22bc16ded.gif)

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Although a most of my help were from online resources, all of the topics discussed in the labs prepared me to complete the assignment. Especially learning about API, I had some experience with HTML and CSS before so that part wasn't too hard but API was a new thing to me and I think it helped a lot on implementing some of my stretch features like searching by genres or getting extra details about a movie.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time I would love to try to improve the youtube embeds loading speed. Adding each trailers to a separate has slowed down the web page a lot. I also want to fix a few more things like some of the movies ID were false and the API would return a 401 error. I want to have some kind of placeholder. An additional feature I would like to add to this project is letting the user add their review or rating to the database. I saw there was a POST method or giving rating but I think it would be time consuming since I'm not too familiar with it. 

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Getting the search by genre to work and the popup went well in the end, I definitely struggled a lot. One things that didn't go as planned and I noticed someone mention that is about the youtube embeds. It's causing my website to be really slow because it takes a little bit of time to load. A peer mentioned that they were using promises so I would love to look into that and improve the running speed of the site. 

### Open-source libraries used

- Add any links to open-source libraries used in your project.
[W3School](https://www.w3schools.com)
[StackOverFlow](https://stackoverflow.com)
### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

I would like to give a shoutout to my TA Rebecca, she's amazing and very helpful. 
