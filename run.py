import os

print("🔧 Installing dependencies...")
os.system("pip install -r requirements.txt")

print("🚀 Starting SMGPUB Drum Generator...")
os.system("python server.py")
