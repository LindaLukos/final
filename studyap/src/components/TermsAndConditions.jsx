import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';

const TermsAndConditions = ({ open, onClose, onAccept }) => {
    const [accepted, setAccepted] = useState(false);
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const [showScrollReminder, setShowScrollReminder] = useState(false);

    useEffect(() => {
        if (open) {
            setAccepted(false);
            setHasScrolledToBottom(false);
            setShowScrollReminder(false);
            // Show scroll reminder after 3 seconds if user hasn't scrolled
            const timer = setTimeout(() => {
                if (!hasScrolledToBottom) {
                    setShowScrollReminder(true);
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [open, hasScrolledToBottom]);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
        
        if (isNearBottom && !hasScrolledToBottom) {
            setHasScrolledToBottom(true);
            setShowScrollReminder(false);
        }
    };

    const handleAccept = () => {
        if (accepted && hasScrolledToBottom) {
            onAccept();
            onClose();
        }
    };

    const handleClose = () => {
        setAccepted(false);
        setHasScrolledToBottom(false);
        setShowScrollReminder(false);
        onClose();
    };

    const handleCheckboxChange = (e) => {
        if (hasScrolledToBottom) {
            setAccepted(e.target.checked);
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="md" 
            fullWidth
            disableEscapeKeyDown
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div">
                        Terms and Conditions
                    </Typography>
                    <Chip 
                        label="Required" 
                        color="primary" 
                        size="small" 
                        variant="outlined"
                    />
                </Box>
            </DialogTitle>
            
            <DialogContent dividers>
                {showScrollReminder && (
                    <Alert 
                        severity="info" 
                        sx={{ mb: 2 }}
                        onClose={() => setShowScrollReminder(false)}
                    >
                        Please scroll through all terms to continue
                    </Alert>
                )}
                
                <Box 
                    sx={{ maxHeight: 450, overflow: 'auto', pr: 1 }}
                    onScroll={handleScroll}
                >
                    <Typography variant="h6" gutterBottom color="primary">
                        1. Acceptance of Terms
                    </Typography>
                    <Typography paragraph>
                        By creating an account and using StudyAP (Study Group Finder), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. These terms constitute a legally binding agreement between you and StudyAP. If you do not agree to these terms, you must not access or use our services.
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        2. Eligibility and Account Registration
                    </Typography>
                    <Typography paragraph>
                        • You must be at least 13 years old to use our services (users under 18 require parental consent)
                    </Typography>
                    <Typography paragraph>
                        • You must provide accurate, current, and complete information during registration
                    </Typography>
                    <Typography paragraph>
                        • You are responsible for maintaining the security and confidentiality of your account credentials
                    </Typography>
                    <Typography paragraph>
                        • You may not create multiple accounts or share your account with others
                    </Typography>
                    <Typography paragraph>
                        • You must notify us immediately of any unauthorized use of your account
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        3. Platform Usage and Conduct
                    </Typography>
                    <Typography paragraph>
                        • Use the platform solely for legitimate educational and study purposes
                    </Typography>
                    <Typography paragraph>
                        • Maintain respectful and professional communication with other users
                    </Typography>
                    <Typography paragraph>
                        • Do not share, upload, or distribute inappropriate, offensive, discriminatory, or illegal content
                    </Typography>
                    <Typography paragraph>
                        • Respect intellectual property rights - do not share copyrighted materials without permission
                    </Typography>
                    <Typography paragraph>
                        • Do not engage in spam, harassment, bullying, or any disruptive behavior
                    </Typography>
                    <Typography paragraph>
                        • Do not attempt to hack, reverse engineer, or compromise the platform's security
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        4. Study Group Guidelines
                    </Typography>
                    <Typography paragraph>
                        • All study groups must be created for legitimate educational purposes related to academic subjects
                    </Typography>
                    <Typography paragraph>
                        • Group creators and moderators are responsible for maintaining appropriate group standards
                    </Typography>
                    <Typography paragraph>
                        • Commercial activities, advertising, or promotional content are prohibited without prior approval
                    </Typography>
                    <Typography paragraph>
                        • Academic integrity must be maintained - do not facilitate cheating or plagiarism
                    </Typography>
                    <Typography paragraph>
                        • Study materials shared must comply with fair use guidelines and copyright laws
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        5. Privacy and Data Protection
                    </Typography>
                    <Typography paragraph>
                        • We collect only necessary information required to provide and improve our services
                    </Typography>
                    <Typography paragraph>
                        • Personal information is protected according to our Privacy Policy and applicable data protection laws
                    </Typography>
                    <Typography paragraph>
                        • We do not sell your personal information to third parties
                    </Typography>
                    <Typography paragraph>
                        • You have rights regarding your data, including access, correction, and deletion
                    </Typography>
                    <Typography paragraph>
                        • We may use anonymized data for analytics and service improvement
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        6. Content and Intellectual Property
                    </Typography>
                    <Typography paragraph>
                        • You retain ownership of content you create and share on the platform
                    </Typography>
                    <Typography paragraph>
                        • By sharing content, you grant us a license to host, display, and distribute it within the platform
                    </Typography>
                    <Typography paragraph>
                        • You are responsible for ensuring you have rights to share any content you upload
                    </Typography>
                    <Typography paragraph>
                        • We may remove content that violates these terms or applicable laws
                    </Typography>
                    <Typography paragraph>
                        • Our platform, design, and features are protected by intellectual property laws
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        7. Service Availability and Modifications
                    </Typography>
                    <Typography paragraph>
                        • Services are provided "as is" without warranties of continuous availability
                    </Typography>
                    <Typography paragraph>
                        • We reserve the right to modify, suspend, or discontinue services with reasonable notice
                    </Typography>
                    <Typography paragraph>
                        • We may perform maintenance that temporarily affects service availability
                    </Typography>
                    <Typography paragraph>
                        • We are not liable for service interruptions beyond our reasonable control
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        8. Account Suspension and Termination
                    </Typography>
                    <Typography paragraph>
                        • We reserve the right to suspend or terminate accounts that violate these terms
                    </Typography>
                    <Typography paragraph>
                        • Serious violations may result in immediate account termination without prior notice
                    </Typography>
                    <Typography paragraph>
                        • You may delete your account at any time through your account settings
                    </Typography>
                    <Typography paragraph>
                        • Upon termination, your access to the platform will cease, but certain data may be retained as required by law
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        9. Limitation of Liability and Disclaimers
                    </Typography>
                    <Typography paragraph>
                        • StudyAP is not responsible for the accuracy, quality, or reliability of user-generated content
                    </Typography>
                    <Typography paragraph>
                        • We are not liable for any academic consequences resulting from platform use
                    </Typography>
                    <Typography paragraph>
                        • Our liability is limited to the maximum extent permitted by applicable law
                    </Typography>
                    <Typography paragraph>
                        • We disclaim all warranties, express or implied, regarding the services
                    </Typography>
                    <Typography paragraph>
                        • You use the platform at your own risk and responsibility
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        10. Updates to Terms
                    </Typography>
                    <Typography paragraph>
                        • We may update these terms periodically to reflect changes in our services or legal requirements
                    </Typography>
                    <Typography paragraph>
                        • Significant changes will be communicated through the platform or email
                    </Typography>
                    <Typography paragraph>
                        • Continued use of the platform after updates constitutes acceptance of new terms
                    </Typography>
                    <Typography paragraph>
                        • If you disagree with updated terms, you should discontinue use of the platform
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        11. Governing Law and Dispute Resolution
                    </Typography>
                    <Typography paragraph>
                        • These terms are governed by the laws of [Your Jurisdiction]
                    </Typography>
                    <Typography paragraph>
                        • Disputes will be resolved through binding arbitration or competent courts
                    </Typography>
                    <Typography paragraph>
                        • You waive any right to participate in class-action lawsuits against us
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom color="primary">
                        12. Contact Information
                    </Typography>
                    <Typography paragraph>
                        For questions, concerns, or reports regarding these terms or our services, please contact us:
                    </Typography>
                    <Typography paragraph>
                        • Email: support@studyap.com
                    </Typography>
                    <Typography paragraph>
                        • Through the platform's support system
                    </Typography>
                    <Typography paragraph>
                        • Mailing address: [Your Business Address]
                    </Typography>

                    <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" align="center">
                            <strong>Last updated:</strong> June 29, 2025<br />
                            <strong>Effective date:</strong> June 29, 2025<br />
                            <strong>Version:</strong> 2.1
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ flexDirection: 'column', gap: 2, p: 3 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={accepted}
                            onChange={handleCheckboxChange}
                            color="primary"
                            disabled={!hasScrolledToBottom}
                        />
                    }
                    label={
                        <Typography variant="body2">
                            I have read and agree to the Terms and Conditions
                            {!hasScrolledToBottom && (
                                <Typography variant="caption" color="text.secondary" display="block">
                                    (Please scroll through all terms first)
                                </Typography>
                            )}
                        </Typography>
                    }
                    sx={{ alignSelf: 'flex-start' }}
                />
                
                <Box sx={{ display: 'flex', gap: 2, alignSelf: 'flex-end' }}>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleAccept} 
                        variant="contained"
                        disabled={!accepted || !hasScrolledToBottom}
                    >
                        Accept & Continue
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default TermsAndConditions;