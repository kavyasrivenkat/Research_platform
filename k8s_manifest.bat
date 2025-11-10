@echo off
REM Create k8s folder if it doesn't exist
if not exist k8s mkdir k8s

REM backend-deployment.yaml
echo apiVersion: apps/v1>k8s\backend-deployment.yaml
echo kind: Deployment>>k8s\backend-deployment.yaml
echo metadata:>>k8s\backend-deployment.yaml
echo.  name: research-backend>>k8s\backend-deployment.yaml
echo.  labels:>>k8s\backend-deployment.yaml
echo.    app: research-backend>>k8s\backend-deployment.yaml
echo spec:>>k8s\backend-deployment.yaml
echo.  replicas: 1>>k8s\backend-deployment.yaml
echo.  selector:>>k8s\backend-deployment.yaml
echo.    matchLabels:>>k8s\backend-deployment.yaml
echo.      app: research-backend>>k8s\backend-deployment.yaml
echo.  template:>>k8s\backend-deployment.yaml
echo.    metadata:>>k8s\backend-deployment.yaml
echo.      labels:>>k8s\backend-deployment.yaml
echo.        app: research-backend>>k8s\backend-deployment.yaml
echo.    spec:>>k8s\backend-deployment.yaml
echo.      containers:>>k8s\backend-deployment.yaml
echo.        - name: research-backend>>k8s\backend-deployment.yaml
echo.          image: gcr.io/devops-477616/research-backend:latest>>k8s\backend-deployment.yaml
echo.          env:>>k8s\backend-deployment.yaml
echo.            - name: MONGODB_URI>>k8s\backend-deployment.yaml
echo.              value: "mongodb+srv://shankaravadhulasa_db_user:Shankara108*@cluster0.bmvpnxt.mongodb.net/?appName=Cluster0">>k8s\backend-deployment.yaml
echo.            - name: JWT_SECRET>>k8s\backend-deployment.yaml
echo.              value: "your_super_secret_jwt_key_change_this_in_production">>k8s\backend-deployment.yaml
echo.            - name: PORT>>k8s\backend-deployment.yaml
echo.              value: "5000">>k8s\backend-deployment.yaml
echo.            - name: NODE_ENV>>k8s\backend-deployment.yaml
echo.              value: "production">>k8s\backend-deployment.yaml
echo.          ports:>>k8s\backend-deployment.yaml
echo.            - containerPort: 5000>>k8s\backend-deployment.yaml
echo.              protocol: TCP>>k8s\backend-deployment.yaml
echo.          resources:>>k8s\backend-deployment.yaml
echo.            requests:>>k8s\backend-deployment.yaml
echo.              memory: "256Mi">>k8s\backend-deployment.yaml
echo.              cpu: "250m">>k8s\backend-deployment.yaml
echo.            limits:>>k8s\backend-deployment.yaml
echo.              memory: "512Mi">>k8s\backend-deployment.yaml
echo.              cpu: "500m">>k8s\backend-deployment.yaml
echo.          livenessProbe:>>k8s\backend-deployment.yaml
echo.            httpGet:>>k8s\backend-deployment.yaml
echo.              path: /api/auth/me>>k8s\backend-deployment.yaml
echo.              port: 5000>>k8s\backend-deployment.yaml
echo.            initialDelaySeconds: 30>>k8s\backend-deployment.yaml
echo.            periodSeconds: 10>>k8s\backend-deployment.yaml
echo.          readinessProbe:>>k8s\backend-deployment.yaml
echo.            httpGet:>>k8s\backend-deployment.yaml
echo.              path: /api/auth/me>>k8s\backend-deployment.yaml
echo.              port: 5000>>k8s\backend-deployment.yaml
echo.            initialDelaySeconds: 5>>k8s\backend-deployment.yaml
echo.            periodSeconds: 5>>k8s\backend-deployment.yaml

REM backend-service.yaml
(
echo apiVersion: v1
echo kind: Service
echo metadata:
echo.  name: research-backend-service
echo.  labels:
echo.    app: research-backend
echo spec:
echo.  type: LoadBalancer
echo.  selector:
echo.    app: research-backend
echo.  ports:
echo.    - port: 5000
echo.      targetPort: 5000
echo.      protocol: TCP
echo.      name: http
) > k8s\backend-service.yaml

REM frontend-deployment.yaml
(
echo apiVersion: apps/v1
echo kind: Deployment
echo metadata:
echo.  name: research-frontend
echo.  labels:
echo.    app: research-frontend
echo spec:
echo.  replicas: 1
echo.  selector:
echo.    matchLabels:
echo.      app: research-frontend
echo.  template:
echo.    metadata:
echo.      labels:
echo.        app: research-frontend
echo.    spec:
echo.      containers:
echo.        - name: research-frontend
echo.          image: gcr.io/devops-477616/research-frontend:latest
echo.          ports:
echo.            - containerPort: 80
echo.              protocol: TCP
echo.          resources:
echo.            requests:
echo.              memory: "128Mi"
echo.              cpu: "100m"
echo.            limits:
echo.              memory: "256Mi"
echo.              cpu: "200m"
echo.          livenessProbe:
echo.            httpGet:
echo.              path: /
echo.              port: 80
echo.            initialDelaySeconds: 30
echo.            periodSeconds: 10
echo.          readinessProbe:
echo.            httpGet:
echo.              path: /
echo.              port: 80
echo.            initialDelaySeconds: 5
echo.            periodSeconds: 5
) > k8s\frontend-deployment.yaml

REM frontend-service.yaml
(
echo apiVersion: v1
echo kind: Service
echo metadata:
echo.  name: research-frontend-service
echo.  labels:
echo.    app: research-frontend
echo spec:
echo.  type: LoadBalancer
echo.  selector:
echo.    app: research-frontend
echo.  ports:
echo.    - port: 80
echo.      targetPort: 80
echo.      protocol: TCP
echo.      name: http
) > k8s\frontend-service.yaml

echo YAML files created in the k8s folder.
pause
