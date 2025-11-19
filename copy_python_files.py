import os
import shutil

# Source and destination directories
source_dir = r"c:\Users\visha\OneDrive\Desktop\Python_lab_practice"
dest_dir = r"c:\python_program_host\public\Python_lab_practice"

# Create destination directory if it doesn't exist
os.makedirs(dest_dir, exist_ok=True)

# Copy all Python files
for filename in os.listdir(source_dir):
    if filename.endswith('.py'):
        source_path = os.path.join(source_dir, filename)
        dest_path = os.path.join(dest_dir, filename)
        shutil.copy2(source_path, dest_path)
        print(f"Copied: {filename}")

print("\nAll Python files copied successfully!")
