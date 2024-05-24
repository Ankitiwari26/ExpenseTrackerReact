import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerification = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    setLoading(true); // Set loading state to true
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      const idToken = await user.getIdToken(true);
      console.log("verification mail sending");
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDwLC6MnNKHXySAzDS9JLzCjVpcWG01AA8`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }

      console.log("verification mail sent");
      setVerify(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  useEffect(() => {
    if (verify === true) {
      navigate("/home");
    }
  }, [verify, navigate]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleVerification}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default VerifyEmail;
