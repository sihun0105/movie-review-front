{
    echo "Stopping all services with PM2..."

    pm2 delete movie-front
    
    echo "All services stopped!"

    pm2 list
}