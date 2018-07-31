Arabic multiple choice quiz app using React, with a back-end in Flask. 

Designed to test my knowledge of Arabic triconsonantal roots (https://en.wikipedia.org/wiki/Semitic_root), progressively providing new roots. However, could be used for any basic question-answer quiz. 

User creates account, and is initially given a quiz of 20 roots. User's progress is recorded in a database every time they take the quiz. Once they have got a given root correct on 5 occasions, that root is removed and replaced with a new one when they take the quiz again. 

To run:

in /server:

"export FLASK_APP=arabic_genius.py"
"flask run"

in root:

"npm start"

Runs on http://localhost:3000/

Database to be created from db.sql