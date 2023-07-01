exports.dateToString = (date) => new Date(date).toISOString();

exports.segmentDates = (inputArray) => {
  // Sort the input array based on createdAt dates in descending order
  inputArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Get the current date
  const currentDate = new Date();

  // Initialize the output array
  const outputArray = [];

  // Create the current month segment
  const thisMonth = { segment: "This Month", data: [] };

  // Create segments for previous months
  const previousMonths = new Map();

  for (const item of inputArray) {
    const createdAt = new Date(item.createdAt);

    // Check if the createdAt date is within the current month
    if (
      createdAt.getMonth() === currentDate.getMonth() &&
      createdAt.getFullYear() === currentDate.getFullYear()
    ) {
      thisMonth.data.push(item);
    }
    // Check if the createdAt date is in previous months
    else {
      const monthYear = createdAt.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (previousMonths.has(monthYear)) {
        previousMonths.get(monthYear).data.push(item);
      } else {
        const monthSegment = { segment: monthYear, data: [item] };
        previousMonths.set(monthYear, monthSegment);
      }
    }
  }

  // Add segments to the output array
  if (thisMonth.data.length > 0) {
    outputArray.push(thisMonth);
  }

  // Sort previous months by descending order
  const sortedPreviousMonths = Array.from(previousMonths.values()).sort(
    (a, b) => new Date(b.segment) - new Date(a.segment)
  );
  outputArray.push(...sortedPreviousMonths);

  return outputArray;
};

exports.groupByDate = (objects) => {
  return objects.reduce((result, obj) => {
    const createdAtDate = obj.createdAt.split("T")[0];
    const lastGroup = result[result.length - 1];

    if (lastGroup?.[0].createdAt.startsWith(createdAtDate)) {
      lastGroup.push(obj);
    } else {
      result.push([obj]);
    }

    return result;
  }, []);
};
