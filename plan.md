### Step 1: Initialize Core Frame Endpoint  
```text  
- Build: Create /api/frame POST handler with basic screen routing (page 1 only)
- Outcome: Frame shows Season 1 announcement with "Next" button. Clicking button does nothing yet
```  

### Step 2: Implement State Navigation  
```text  
- Build: Add state parsing/encoding for page transitions (1→2→3)
- Outcome: Buttons cycle through all 3 pages in order. State persists as base64url in response
```  

### Step 3: Basic Image Generation Setup  
```text  
- Build: Create @vercel/og templates for all 3 screens (static content)
- Outcome: Each page displays correct template image with placeholder data
```  

### Step 4: Add Frame Validation  
```text  
- Build: Integrate Neynar API validation with NEYNAR_API_KEY
- Outcome: Invalid requests return error image. Valid requests show proper screen
```  

### Step 5: Handle Invalid Navigation  
```text  
- Build: Add state reset logic for invalid page numbers (>3 or <1)
- Outcome: Malformed state parameters always reset to page 1
```  

### Step 6: Implement Error Fallback Images  
```text  
- Build: Add try/catch around image generation with error screen fallback
- Outcome: Image generation failures show "Refresh" button and error message
```  

### Step 7: Finalize CTA Functionality  
```text  
- Build: Implement website claim button (external link) on screen 3
- Outcome: Clicking "Claim Now" opens project website in new tab
```