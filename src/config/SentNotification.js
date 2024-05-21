class SentNotification {
    constructor(appName, message) {
        this.appName = appName;
        this.message = message;
        this.to = "Admin";
        this.firebaseKey = this.getKey();
        this.endpoint = "https://fcm.googleapis.com/fcm/send";
    }

    async getKey() {
        return '    ';
    }

    async sendNotification() {
        try {
            const body = {
                notification: {
                    title: this.appName,
                    body: this.message,
                },
                to: `/topics/${this.to}`,
            };

            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `key=${await this.firebaseKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const responseData = await response.json();
            console.log('Response:', response.status, responseData);
            return responseData;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
