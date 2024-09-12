const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null


async function fetchProperties() {
    try {
        // handle the case when domain is not available
        if (!apiDomain) {
            return []
        }
        const res = await fetch(`${apiDomain}/properties/`, {
            cache: 'no-store',
        })
        if (!res.ok) {
            throw new Error('Failed to fetch properties.');
        }
        return res.json()
    } catch (err) {
        console.log(err)
        return []
    }
}

async function fetchProperty(id) {
    try {
        // Ensure apiDomain is defined and has a value
        const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
        if (!apiDomain) {
            throw new Error('API domain is not set.');
        }

        console.log('Running fetch property with ID:', id);

        const res = await fetch(`${apiDomain}/properties/${id}/`, {
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch properties.`);
        }

        const data = await res.json();
        console.log('Fetched property data:', data);

        // If the API returns an array, filter it by the given ID
        if (Array.isArray(data)) {
            const property = data.find(prop => prop._id === id);
            if (!property) {
                throw new Error('No property found with the provided ID.');
            }
            return property;
        } else {
            // If the API correctly returns a single object, check if it matches the ID
            if (data._id !== id) {
                throw new Error('Returned data does not match the requested ID.');
            }
            return data;
        }
    } catch (err) {
        console.error('Error in fetchProperty:', err);
        return null;
    }
}



export { fetchProperties, fetchProperty }