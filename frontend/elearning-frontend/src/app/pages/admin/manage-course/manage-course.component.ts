import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {
  courseContent: any;
  chapterForm: FormGroup;
  lessonForm: FormGroup;
  courseId!: number;

  showAddChapterForm = false;
  showAddLessonFormForChapterId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private fb: FormBuilder,
  ) {
    this.chapterForm = this.fb.group({
      title: ['', Validators.required],
      order: [1, Validators.required],
    });

    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      order: [1, Validators.required],
      videoUrl: [''],
    });
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.courseId) {
      this.loadCourseContent();
    }
  }

  loadCourseContent() {
    this.courseService.getCourseContent(this.courseId).subscribe(data => {
      this.courseContent = data;
    });
  }

  onChapterSubmit() {
    if (this.chapterForm.invalid) return;

    this.courseService.addChapter(this.courseId, this.chapterForm.value).subscribe(() => {
      this.loadCourseContent(); 
      this.chapterForm.reset({ order: 1 }); 
      this.showAddChapterForm = false; 
    });
  }

  onLessonSubmit(chapterId: number) {
    if (this.lessonForm.invalid) return;

    this.courseService.addLesson(chapterId, this.lessonForm.value).subscribe(() => {
      this.loadCourseContent();
      this.lessonForm.reset({ order: 1 });
      this.showAddLessonFormForChapterId = null; 
    });
  }
}