import random
import bcrypt
from pymongo import MongoClient

def hash_password(password: str) -> str:
    # Generate a salt
    salt = bcrypt.gensalt()

    # Hash the password with the salt
    hashed = bcrypt.hashpw(password.encode(), salt)

    return hashed.decode()

# generating enrollment numbers: 2024JEExxxxxx

enrollment_nos = []

for i in range(10):
    rnd_num = random.randint(100000, 999999)
    enrollment_num = "2024JEE"+str(rnd_num)
    enrollment_nos.append(enrollment_num)

# generating passwords: passwordx
passwords = []
passwords_enc = []
for i in range(10):
    passwords.append("password"+str(i))
    passwords_enc.append(hash_password("password"+str(i)))

# names
names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Hannah", "Ivan", "Julia"]

# pfps list
# <a href='https://postimages.org/' target='_blank'><img src='https://i.postimg.cc/JySpkFjL/user.jpg' border='0' alt='user'/></a>
pfps = ["https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg", "https://i.postimg.cc/JySpkFjL/user.jpg"]


documents = []

for i in range(10):
    temp_dict = {}
    temp_dict['eno'] = enrollment_nos[i]
    temp_dict['pass'] = passwords_enc[i]
    temp_dict['name'] = names[i]
    temp_dict['pfp'] = pfps[i]
    documents.append(temp_dict)

print(documents)

client = MongoClient('mongodb+srv://shankaranarayananvsn:ovaOydsE32MSvo3l@cluster0.fpdhook.mongodb.net/userAuth?retryWrites=true&w=majority&appName=Cluster0')
db = client['authDB']
collection = db['authCollections']
collection.insert_many(documents)