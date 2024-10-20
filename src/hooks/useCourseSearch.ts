import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";

const useCourseSearch = (term: string, cacheDuration: number) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchCourses = async (term: string) => {
		setLoading(true);
		setError(null);

		const cachedData = localStorage.getItem(`courses_${term}`);
		if (cachedData) {
			const parsedData = JSON.parse(cachedData);
			setCourses(parsedData.courses);
			setLoading(false);
			return;
		}

		try {
			const res = await fetch(`/api/courses?search=${term}`);
			if (!res.ok) throw new Error("Failed to fetch courses");
			const data = await res.json();
			if (term) {
				const cacheData = {
					timestamp: Date.now(),
					courses: data,
				};
				localStorage.setItem(`courses_${term}`, JSON.stringify(cacheData));
			}
			setCourses(data);
		} catch (err) {
			setError("Unable to load courses. Please try again later, Error: " + err);
		} finally {
			setLoading(false);      
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchCourses = useMemo(() => debounce((term: string) => fetchCourses(term), 300), [term]);

	const clearExpiredCaches = () => {
		const keys = Object.keys(localStorage);
		keys.forEach((key) => {
			const cachedData = localStorage.getItem(key);
			if (cachedData) {
				const { timestamp } = JSON.parse(cachedData);
				if (Date.now() - timestamp >= cacheDuration) {
					localStorage.removeItem(key);
				}
			}
		});
	};

	useEffect(() => {
		clearExpiredCaches();
		if (term) debouncedFetchCourses(term);
		else fetchCourses(term);
	}, [term]);

  return { courses, loading, error };
};

export default useCourseSearch;



