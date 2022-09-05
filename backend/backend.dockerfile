FROM python:3.10
ENV PYTHONUNBUFFERED=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/backend
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
COPY . /backend
EXPOSE 8000