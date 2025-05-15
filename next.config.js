module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/ideas?orderBy=createdAt',
                permanent: false,
            },
        ]
    },
}
