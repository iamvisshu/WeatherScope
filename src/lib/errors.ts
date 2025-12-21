/**
 * Custom error classes for WeatherScope application
 */

export class LocationNotFoundError extends Error {
    constructor(city: string) {
        super(`Location not found: "${city}". Please check the spelling or try a different city.`);
        this.name = 'LocationNotFoundError';
    }
}

export class NetworkTimeoutError extends Error {
    constructor(message: string = 'Request timed out. Please check your internet connection and try again.') {
        super(message);
        this.name = 'NetworkTimeoutError';
    }
}

export class APIQuotaExceededError extends Error {
    constructor(message: string = 'API quota exceeded. Please try again later.') {
        super(message);
        this.name = 'APIQuotaExceededError';
    }
}

export class InvalidInputError extends Error {
    constructor(input: string) {
        super(`Invalid input: "${input}". Please enter a valid city name.`);
        this.name = 'InvalidInputError';
    }
}

export class WeatherAPIError extends Error {
    constructor(message: string, public statusCode?: number) {
        super(message);
        this.name = 'WeatherAPIError';
    }
}
