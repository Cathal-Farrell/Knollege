# Knollege
Year 3 project 



Must install nodes with "npm install package.json", if having issues with MongoDB not recongized: use "npm install mongodb" aswell.

V0.3 - Cathal:  
In MongoDB (user: admin, password: pass): create database "app", collection "notes", document with {[leave normal ID alone], "userID": 100, "text": " "}

V0.4 - Cathal:  
Text saves every 5 secs. If no text inputted in last 5 seconds, will check database but idk how to take put database text into text box element

V0.12 - Cathal:  
Working Sign-up/Login (no sessions so no functionality).
Cannot create new notes, can edit notes with access to.
Can create chats with permitted members.
No searching for groups/chats.
Can message into chats.

V1.1 - Vlad:
Done some designing on the home page, added a profile icon where a user can select to log in(takes you to the login page),
go into settings or log out (not working fully yet). Added icons for the users to navigate through the buttons easier and changed the layout.

V1.2 - Cathal:
Long polling implemented on messages, timeout = 30secs, 1 sec cooldown required between inputs for fast messages. Doesn't seem to work when I have one user on firefox and another user on opera GX, two users on firefox does work.

V1.3 - Vlad: Almost finished designing the Dashboard page(Home), Looks like the wirefame
1. Addded a left side bar that allows to open a file or foled(not yet implemented).
2. Flex layout that creates a 2 column layout that has a sidebar and then a New+ files section, aligned using marginleft(easiest way to understand how it works)
3. New Styled cards instead of a boring looking filesid and user id, Implemented transitions, hovering and colours so it looks more appealing 
