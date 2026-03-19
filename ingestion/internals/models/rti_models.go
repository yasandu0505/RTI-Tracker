package models

import (
	"fmt"
	"strings"
)

type RTIRequest struct {
	Title               string `json:"title"`
	Content             string `json:"content"`
	Sender              string `json:"sender"`
	ReceiverInstitution string `json:"receiver_institution"`
	ReceiverPosition    string `json:"receiver_position"`
	Created             string `json:"created"`
}

func (r *RTIRequest) Validate() error {
	if strings.TrimSpace(r.Title) == "" {
		return fmt.Errorf("RTI request title cannot be empty")
	} else if strings.TrimSpace(r.Content) == "" {
		return fmt.Errorf("RTI request content cannot be empty")
	} else if strings.TrimSpace(r.Sender) == "" {
		return fmt.Errorf("RTI request sender cannot be empty")
	} else if strings.TrimSpace(r.ReceiverInstitution) == "" {
		return fmt.Errorf("RTI request receiver institution cannot be empty")
	} else if strings.TrimSpace(r.ReceiverPosition) == "" {
		return fmt.Errorf("RTI request receiver position cannot be empty")
	} else if strings.TrimSpace(r.Created) == "" {
		return fmt.Errorf("RTI request created cannot be empty")
	}

	return nil

}
