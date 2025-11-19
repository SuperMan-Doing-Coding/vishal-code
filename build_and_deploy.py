import os
import subprocess
import shutil

def run_command(command, description):
    """Run a command and display the result."""
    print(f"\n{description}...")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        print(f"✓ {description} completed successfully")
        if result.stdout:
            print(result.stdout)
    else:
        print(f"✗ {description} failed")
        if result.stderr:
            print(result.stderr)
        return False
    return True

def prepare_for_deployment():
    """Prepare the application for deployment."""
    print("=" * 60)
    print("Python Code Showcase - Deployment Preparation")
    print("=" * 60)
    
    # Step 1: Copy Python files
    if not run_command("python copy_python_files.py", "Copying Python files"):
        return False
    
    # Step 2: Install dependencies
    if not run_command("npm install", "Installing dependencies"):
        return False
    
    # Step 3: Build the application
    if not run_command("npm run build", "Building React application"):
        return False
    
    # Step 4: Verify build output
    build_dir = "build"
    if os.path.exists(build_dir):
        print(f"\n✓ Build directory created: {os.path.abspath(build_dir)}")
        
        # Check if Python files are in the build
        python_files_dir = os.path.join(build_dir, "Python_lab_practice")
        if os.path.exists(python_files_dir):
            python_files = [f for f in os.listdir(python_files_dir) if f.endswith('.py')]
            print(f"✓ Found {len(python_files)} Python files in build directory")
        else:
            print("✗ Python files not found in build directory")
            # Copy them manually if needed
            shutil.copytree("public/Python_lab_practice", python_files_dir, dirs_exist_ok=True)
            print("✓ Python files copied to build directory")
    else:
        print("✗ Build directory not created")
        return False
    
    print("\n" + "=" * 60)
    print("Deployment preparation complete!")
    print("=" * 60)
    print("\nTo deploy:")
    print("1. Upload the contents of the 'build' directory to your hosting service")
    print("2. Ensure your hosting service supports static file hosting")
    print("3. The Python files will be available at /Python_lab_practice/")
    
    return True

if __name__ == "__main__":
    prepare_for_deployment()
