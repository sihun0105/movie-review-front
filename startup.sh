{
    echo "Stopping all services with PM2..."

    pm2 start pnpm --name movie-front -- start --time
    
    echo "All services stopped!"

    pm2 list
}