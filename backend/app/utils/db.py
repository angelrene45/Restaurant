import os 
import subprocess
import gzip

from app.core.config import settings

def backup_database(compress: bool=True) -> str:
    env = {
        'PGPASSWORD': settings.DB_PASSWORD
    }
    command = f'pg_dump ' \
            f'--host={settings.DB_SERVER} ' \
            f'--dbname={settings.DB_NAME} ' \
            f'--username={settings.DB_USER} ' \
            f'--no-password ' \
            f'--data-only '
    status = False

    if compress:       
        path_file = f"static/backup.gz"
        with gzip.open(path_file, 'wb') as f:
            popen = subprocess.Popen(command, shell=True, env=env, stdout=subprocess.PIPE, universal_newlines=True, timeout=20)
            for stdout_line in iter(popen.stdout.readline, ''):
                f.write((stdout_line.encode('utf-8')))
            popen.stdout.close()
            popen.wait()
            if popen.returncode == 0: status = True
    else:
        path_file = f"static/backup.sql"
        with open(path_file, 'wb') as f:
            proc = subprocess.run(command, shell=True, env=env, stdout=f, encoding="utf-8", timeout=20)
            if proc.returncode == 0: status = True

    if not status: 
        os.remove(path_file)
        return ''
    else:
        return path_file


def restore_database() -> bool:
    env = {
        'PGPASSWORD': settings.DB_PASSWORD
    }
    command = f'psql ' \
            f'--host={settings.DB_SERVER} ' \
            f'--dbname={settings.DB_NAME} ' \
            f'--username={settings.DB_USER} ' \
            f'--file=static/backup.sql'
    try:
        proc = subprocess.run(command, shell=True, env=env, capture_output=True, timeout=10)
        if proc.returncode == 0: return True
        else: return False
    except subprocess.TimeoutExpired as timeErr:
        print(f"stdout:\n{timeErr.stdout}\n")
        print(f"stderr:\n{timeErr.stderr}\n")
        return False
    except Exception as e:
        print(f"traceback:\n{e}\n")
        return False