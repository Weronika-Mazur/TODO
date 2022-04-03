export default async function userHandling(
  values: { email?: string; password?: string },
  url: string
) {
  try {
    const formData = JSON.stringify(
      { email: values.email, password: values.password },
      null,
      2
    );

    const data = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "application/json",
      },
    });
    const response = await data.json();

    return response;
  } catch (e) {}
}
